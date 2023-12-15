using EV_ChargingApp.Exceptions;
using System.Net;
using System.Text.Json;
using KeyNotFoundException = EV_ChargingApp.Exceptions.KeyNotFoundException;
using NotImplementedException = EV_ChargingApp.Exceptions.NotImplementedException;
using UnauthorizedAccessException = EV_ChargingApp.Exceptions.UnauthorizedAccessException;

namespace EV_ChargingApp.Configurations
{
    public class GlobalExceptionHandlingMiddleware
    {
        private readonly RequestDelegate _next;
        public GlobalExceptionHandlingMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            HttpStatusCode status;
            var stackTrace = exception.StackTrace;
            string message = exception.Message;

            var exceptionType = exception.GetType();

            if (exceptionType == typeof(BadRequestException))
            {
                
                status = HttpStatusCode.BadRequest;
            }
            else if (exceptionType == typeof(NotFoundException))
            {
              
                status = HttpStatusCode.NotFound;
            }
            else if (exceptionType == typeof(UnauthorizedAccessException))
            {
               
                status = HttpStatusCode.Unauthorized;
            }
            else if (exceptionType == typeof(NotImplementedException))
            {
                
                status = HttpStatusCode.NotImplemented;
            }
            else if (exceptionType == typeof(KeyNotFoundException))
            {
               
                status = HttpStatusCode.Unauthorized;
            }
            else
            {
               
                status = HttpStatusCode.InternalServerError;
            }

            var exceptionResult = JsonSerializer.Serialize(new { error = message, stackTrace });
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)status;

            return context.Response.WriteAsync(exceptionResult);
        }
    }
}
