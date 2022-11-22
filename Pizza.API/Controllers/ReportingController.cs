using Microsoft.AspNetCore.Mvc;
using Pizza.API.DTOs;
using Pizza.API.Interfaces;

namespace Pizza.API.Controllers
{
    public class ReportingController : BaseApiController
    {
        private readonly IReportingRepository _reportingRepository;
        public ReportingController(IReportingRepository reportingRepository)
        {
            _reportingRepository = reportingRepository;
        }

        [HttpGet("EmployeeCompensationReport", Name = "GetEmployeeCompensationReport")]
        public async Task<ActionResult<IEnumerable<EmployeeCompensationReportDto>>> GetEmployeeCompensationReport(DateTime start, DateTime end)
        {
            var report = await _reportingRepository.GetEmployeeCompensationReportAsync(start, end);
            return Ok(report);
        }

        [HttpGet("EmployeeOrderReport", Name = "GetEmployeeOrderReport")]
        public async Task<ActionResult<IEnumerable<EmployeeOrderReportDto>>> GetEmployeeOrderReport(DateTime start, DateTime end)
        {
            var report = await _reportingRepository.GetEmployeeOrderReportAsync(start, end);
            return Ok(report);
        }

        [HttpGet("RevenueReport", Name = "GetRevenueOrderReport")]
        public async Task<ActionResult<IEnumerable<RevenueReportDto>>> GetRevenueReport(DateTime start, DateTime end)
        {
            var report = await _reportingRepository.GetRevenueReportAsync(start, end);
            return Ok(report);
        }
    }
}
