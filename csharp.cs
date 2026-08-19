public class Employee {
    public String Name { get; set;}
    public double Salary { get; set;}
    public String @string  {get; set;}
    public String Position {get; set;}

    public double Tax {get; set;}

Employee(string name, double salary, string state, string position) {
        Name = name;
        Salary = salary;
        State = state;
        Position = position;
    }


}