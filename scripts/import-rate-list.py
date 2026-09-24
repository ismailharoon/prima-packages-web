"""Read the supplied price sheet and update matching catalog variants only."""
import json
import re
from pathlib import Path
import openpyxl

sheet = openpyxl.load_workbook(r'C:\Users\Noman Traders\Downloads\Rate list (1).xlsx', data_only=True).active
variants = {}
def collect(slug, rows, header, prefix='', per_piece=False, print_type=None):
    result = variants.setdefault(slug, [])
    for row in rows:
        size = str(sheet.cell(row, 1).value).strip().replace(' x ', ' × ')
        for col in range(2, 7):
            quantity = sheet.cell(header, col).value
            rate = sheet.cell(row, col).value
            if quantity is None or rate is None: continue
            qty = int(re.search(r'\d+', quantity).group())
            unit = int(str(rate).replace('/-', '').split('.')[0])
            name = f'{prefix}{size} in'
            item = dict(label=name, sizeCategory=name, quantity=f'{qty:,} pcs', price=unit * qty if per_piece else unit)
            if per_piece: item['unitPrice'] = unit
            if print_type: item['printType'] = print_type
            result.append(item)
collect('woven-labels', range(4, 8), 3)
collect('zipper-bags', range(17, 27), 16, 'White · ', True, 'Single side · 1 color')
collect('zipper-bags', range(31, 36), 30, 'Black · ', True, 'Single side · 1 color')
collect('courier-flyer-bags', range(40, 46), 39, per_piece=True)
variants['hang-tags'] = [dict(label='2 × 3.5 in', sizeCategory='2 × 3.5 in', quantity=str(sheet.cell(11,col).value).strip(), printType=f'350 GSM · {side} color print', price=int(sheet.cell(row,col).value)) for row,side in [(12,'Single side'),(13,'Double side')] for col in range(2,6)]

path = Path('src/data/products.ts')
source = path.read_text(encoding='utf-8-sig')
for slug, sizes in variants.items():
    start = source.index(f"    slug: '{slug}'")
    end = source.find('\n  },', start) + len('\n  },')
    block = source[start:end]
    serialized = json.dumps(sizes, ensure_ascii=False, indent=2)
    block = re.sub(r'    sizes: \[.*?\n    \],', '    sizes: ' + serialized.replace('\n','\n    ') + ',', block, count=1, flags=re.S)
    block = re.sub(r"    discountBadge: .*?\n", '', block)
    block = re.sub(r"    moq: '[^']*'", "    moq: 'Min. %s PCS'" % (100 if slug == 'hang-tags' else 50), block)
    if slug == 'zipper-bags':
        block = block.replace('    quoteOnly: true,\n','')
        block = re.sub(r'    configuratorGroups: \[.*?\n    \],\n', '', block, flags=re.S)
        block = re.sub(r"    shortDescription: '[^']*',", "    shortDescription: 'White and black zipper bags with single-side, one-color printing. Choose your color, size and pack quantity.',", block)
        block = block.replace("materials: ['Frosted PE / PEVA']", "materials: ['White / Black Zipper Bags']")
    source = source[:start] + block + source[end:]
path.write_text(source, encoding='utf-8')
print({slug: len(rows) for slug,rows in variants.items()})
