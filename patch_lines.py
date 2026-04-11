import os
import glob
import re

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # If AnimatedLine is already imported, avoid double importing
    if "AnimatedLine" in content:
        return

    original_content = content
    imports_changed = False

    def ensure_import(c):
        if "from \"@/components/shared\"" in c:
            # find the import statement and add AnimatedLine
            import_statement = re.search(r'import \{[^}]*\}\s+from\s+"@/components/shared";', c)
            if import_statement:
                full_match = import_statement.group(0)
                if "AnimatedLine" not in full_match:
                    new_import = full_match.replace("}", ", AnimatedLine }")
                    c = c.replace(full_match, new_import)
        elif "from \"@/components/shared\"" not in c:
            # add the import at the top
            lines = c.split("\n")
            for i, line in enumerate(lines):
                if line.startswith("import"):
                    lines.insert(i+1, "import { AnimatedLine } from \"@/components/shared\";")
                    break
            c = "\n".join(lines)
        return c

    has_changes = False

    # Case 1: Pure horizontal `<div className="border-t border-[var(--c-border-thin)]... />`
    pure_div_pattern = r'<div\s+className="(border-t border-\[var\(--c-border-thin\)\].*?)"\s*/>'
    
    def repl_pure_div(m):
        cls = m.group(1).replace('border-t border-[var(--c-border-thin)]', '').strip()
        nonlocal has_changes
        has_changes = True
        return f'<AnimatedLine className="{cls}" />'

    content = re.sub(pure_div_pattern, repl_pure_div, content)

    # Case 2: containers like `border-t border-[var(--c-border-thin)]`
    container_pattern = r'className="(.*?)border-t\s+border-\[var\(--c-border-thin\)\](.*?)"'
    
    def repl_container(m):
        pre = m.group(1)
        post = m.group(2)
        # Instead of replacing container border-t, let's just do it manually for Layout, Overview, ChatPanel to avoid messing up HTML structure
        return m.group(0) # skip for now

    # Write changes
    if has_changes:
        content = ensure_import(content)
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Patched purely empty divs in {filepath}")

for fp in glob.glob("artifacts/portfolio/src/**/*.tsx", recursive=True):
    process_file(fp)

