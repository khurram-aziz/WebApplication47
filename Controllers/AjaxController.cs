using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Linq;
using WebApplication.Models;

namespace WebApplication.Controllers
{
    public class AjaxController : ApiController, IDisposable
    {
        public class SaleOrder
        {
            public int Number { get; set; }
            public string SalePerson { get; set; }
            public string UserName { get; set; }

            public string CompanyName { get; set; }
            public string Email { get; set; }
            public string MobilePhone { get; set; }
            public string OfficePhone { get; set; }
        }

        IContractResolver _resolver;

        public AjaxController()
        {
            var formatter = GlobalConfiguration.Configuration.Formatters.JsonFormatter;
            _resolver = formatter.SerializerSettings.ContractResolver;
            formatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
        }

        void IDisposable.Dispose()
        {
            var formatter = GlobalConfiguration.Configuration.Formatters.JsonFormatter;
            formatter.SerializerSettings.ContractResolver = _resolver;
        }

        [HttpPost]
        public HttpResponseMessage Signup(UserModel user)
        {
            if (this.ModelState.IsValid)
            {
                return new HttpResponseMessage(HttpStatusCode.OK);
            }
            else
            {
                return this.Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        [HttpGet]
        public HttpResponseMessage SaleOrders()
        {
            var list = new List<SaleOrder>();
            list.Add(new SaleOrder() { Number = 1, UserName = "user1", SalePerson = "salePerson1", CompanyName = "company1", Email = "email1@email.com", MobilePhone = "03001111222", OfficePhone = "111222333" });
            list.Add(new SaleOrder() { Number = 2, UserName = "user2", SalePerson = "salePerson1", CompanyName = "company2", Email = "email2@email.com", MobilePhone = "03001111333", OfficePhone = "111222444" });
            list.Add(new SaleOrder() { Number = 3, UserName = "user3", SalePerson = "salePerson2", CompanyName = "company3", Email = "email3@email.com", MobilePhone = "03001111444", OfficePhone = "111222555" });
            return this.Request.CreateResponse(HttpStatusCode.OK, new
            {
                error = "",
                recordsTotal = list.Count,
                data = list.ToArray()
            });
        }
    }
}
