using Pizza.API.DTOs;

namespace Pizza.API.Interfaces
{
    public interface IReportingRepository
    {
        Task<IEnumerable<EmployeeCompensationReportDto>> GetEmployeeCompensationReportAsync(DateTime Start, DateTime End);
        Task<IEnumerable<EmployeeOrderReportDto>> GetEmployeeOrderReportAsync(DateTime Start, DateTime End);
        Task<IEnumerable<RevenueReportDto>> GetRevenueReportAsync(DateTime Start, DateTime End);
    }
}
