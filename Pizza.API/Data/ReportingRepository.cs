using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Pizza.API.DTOs;
using Pizza.API.Interfaces;

namespace Pizza.API.Data
{
    public class ReportingRepository : IReportingRepository
    {
        private readonly DataContext _context;
        public ReportingRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<EmployeeCompensationReportDto>> GetEmployeeCompensationReportAsync(DateTime start, DateTime end)
        {
            // set end date to last second of the day
            end = end.AddHours(23).AddMinutes(59).AddSeconds(59);
            using (var cmd = _context.Database.GetDbConnection().CreateCommand())
            {
                List<EmployeeCompensationReportDto> report = new List<EmployeeCompensationReportDto>();
                cmd.CommandText = @"SELECT Employee.Id, Employee.FirstName, Employee.LastName, Employee.HoursWorked, Employee.TotalSalaryPaid, Employee.TotalTip, TotalSalaryPaid + TotalTip AS TotalPaid, Employee.OrderCount
FROM(
    SELECT

    E.Id,
    E.FirstName,
    E.LastName,
    FLOOR(SUM(DATEDIFF(Minute, O.DateTimeDelivering, O.DateTimeDelivered)) / 60.0 * 2) AS HoursWorked,
    FLOOR(SUM(DATEDIFF(Minute, O.DateTimeDelivering, O.DateTimeDelivered)) / 60.0 * 2) * E.Salary AS TotalSalaryPaid,
    SUM(O.Tip) AS TotalTip,
	COUNT(O.Id) AS OrderCount


    FROM
Employees E
JOIN Orders O ON E.Id = O.EmployeeId
WHERE O.DateTimeDelivering BETWEEN @Start AND @End AND DateTimeDelivered IS NOT NULL
GROUP BY E.Id, E.FirstName, E.LastName, E.Salary

) Employee";

                cmd.CommandType = System.Data.CommandType.Text;
                if (cmd.Connection.State != System.Data.ConnectionState.Open) cmd.Connection.Open();
                cmd.Parameters.Add(new SqlParameter("@Start", start));
                cmd.Parameters.Add(new SqlParameter("@End", end));
                var reader = await Task.Run(() => cmd.ExecuteReaderAsync());
                while (reader.Read())
                {
                    EmployeeCompensationReportDto emp = new EmployeeCompensationReportDto();
                    emp.Id = reader.GetInt32(0);
                    emp.FirstName = reader.GetString(1);
                    emp.LastName = reader.GetString(2);
                    emp.HoursWorked = reader.GetDecimal(3);
                    emp.TotalSalaryPaid = reader.GetDecimal(4);
                    emp.TotalTip = reader.GetDecimal(5);
                    emp.TotalPaid = reader.GetDecimal(6);
                    emp.OrderCount = reader.GetInt32(7);

                    report.Add(emp);
                }
                return report;
            }
        }

        public async Task<IEnumerable<EmployeeOrderReportDto>> GetEmployeeOrderReportAsync(DateTime start, DateTime end)
        {
            // set end date to last second of the day
            end = end.AddHours(23).AddMinutes(59).AddSeconds(59);
            using (var cmd = _context.Database.GetDbConnection().CreateCommand())
            {
                List<EmployeeOrderReportDto> report = new List<EmployeeOrderReportDto>();
                cmd.CommandText = @"SELECT

    E.Id,
    E.FirstName,
    E.LastName,
	OrderId = O.Id,
    O.Price,
	O.Tip,
    DATEDIFF(MINUTE, O.DateTimeOrdered, O.DateTimeDelivered) AS CompletionTime,
	O.EstimatedTime,
	O.EstimatedTime - DATEDIFF(MINUTE, O.DateTimeOrdered, O.DateTimeDelivered) AS DifferenceBetweenCompletionAndEstimated


    FROM
Employees E
JOIN Orders O ON E.Id = O.EmployeeId
WHERE O.DateTimeDelivering BETWEEN @Start AND @End AND DateTimeDelivered IS NOT NULL";
                cmd.CommandType = System.Data.CommandType.Text;
                if (cmd.Connection.State != System.Data.ConnectionState.Open) cmd.Connection.Open();
                cmd.Parameters.Add(new SqlParameter("@Start", start));
                cmd.Parameters.Add(new SqlParameter("@End", end));
                var reader = await Task.Run(() => cmd.ExecuteReaderAsync());
                while (reader.Read())
                {
                    EmployeeOrderReportDto emp = new EmployeeOrderReportDto();
                    emp.Id = reader.GetInt32(0);
                    emp.FirstName = reader.GetString(1);
                    emp.LastName = reader.GetString(2);
                    emp.OrderId = reader.GetInt32(3);
                    emp.Price = reader.GetDecimal(4);
                    emp.Tip = reader.GetDecimal(5);
                    emp.CompletionTime = reader.GetInt32(6);
                    emp.EstimatedTime = reader.GetInt32(7);
                    emp.DifferenceBetweenCompletionAndEstimated = reader.GetInt32(8);

                    report.Add(emp);
                }
                return report;
            }
        }

        public async Task<IEnumerable<RevenueReportDto>> GetRevenueReportAsync(DateTime start, DateTime end)
        {
            // set end date to last second of the day
            end = end.AddHours(23).AddMinutes(59).AddSeconds(59);
            using (var cmd = _context.Database.GetDbConnection().CreateCommand())
            {
                List<RevenueReportDto> report = new List<RevenueReportDto>();
                cmd.CommandText = @"SELECT SUM(O.Revenue) AS Revenue, SUM(O.TotalSalaryPaid) + SUM(O.TotalTip) AS EmployeeCompensation, SUM(O.Revenue) - (SUM(O.TotalSalaryPaid) + SUM(O.TotalTip)) AS Profit
FROM(
    SELECT
	E.Id,
	SUM(O.Price) AS Revenue,
    FLOOR(SUM(DATEDIFF(Minute, O.DateTimeDelivering, O.DateTimeDelivered)) / 60.0 * 2) * E.Salary AS TotalSalaryPaid,
    SUM(O.Tip) AS TotalTip


    FROM
Employees E
JOIN Orders O ON E.Id = O.EmployeeId
WHERE O.DateTimeDelivering BETWEEN @Start AND @End AND DateTimeDelivered IS NOT NULL
GROUP BY E.Id, E.Salary

) O";
                cmd.CommandType = System.Data.CommandType.Text;
                if (cmd.Connection.State != System.Data.ConnectionState.Open) cmd.Connection.Open();
                cmd.Parameters.Add(new SqlParameter("@Start", start));
                cmd.Parameters.Add(new SqlParameter("@End", end));
                var reader = await Task.Run(() => cmd.ExecuteReaderAsync());
                while (reader.Read())
                {
                    RevenueReportDto rev = new RevenueReportDto();
                    rev.Revenue = reader.GetDecimal(0);
                    rev.EmployeeCompensation = reader.GetDecimal(1);
                    rev.Profit = reader.GetDecimal(2);

                    report.Add(rev);
                }
                return report;
            }
        }
    }

}
