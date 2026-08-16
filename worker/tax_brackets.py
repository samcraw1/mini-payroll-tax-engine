tax_brackets = [
    (11600, 0.10),
    (46150, 0.12),
    (100525, 0.22),
    (191950, 0.24),
    (float('inf'), 0.32)
]

def find_tax_bracket(brackets,income):
    low = 0
    high = len(brackets) - 1

    while low <= high:
        mid = (low + high) // 2
        guess = brackets[mid]

        if income < guess[0]:
            if mid == 0 or income > brackets[mid - 1][0]:
                return guess
            high = mid - 1

        else:
            low = mid + 1

    return None

if __name__ == "__main__":
    import sys
    import json
    income = float(sys.argv[1])
    bracket = find_tax_bracket(tax_brackets, income)
    print(json.dumps({"bracket_limit": bracket[0], "rate": bracket[1]}))

    







