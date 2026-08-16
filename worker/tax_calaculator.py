import sys
import json


def calculate_payroll(gross_pay):
    fed_tax = gross_pay * 0.15
    state_tax = gross_pay * 0.05
    fica = gross_pay * 0.0765
    net_pay = gross_pay - (fed_tax + state_tax + fica)

    return {
        "gross" : gross_pay,
        "fed_tax": round (fed_tax, 2),
        "state_tax": round(state_tax, 2),
        "fica": round(fica, 2),
        "net_pay": round(net_pay, 2)
                      
    }

if __name__ == "__main__":
    gross= float(sys.argv[1])
    result = calculate_payroll(gross)
    print(json.dumps(result))


    