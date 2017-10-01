using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using Newtonsoft.Json;
using WebService;
using WebService.Models;

namespace ContactWeb.Response
{
    public class ContactManagerResponse
    {
        public static async Task<bool> SaveContact(Contact contact)
        {
            var client = new HttpClient();
            var content = JsonConvert.SerializeObject(contact);
            var httpContent = new StringContent(content,Encoding.UTF8,"application/json");
            var response = await client.PostAsync("http://localhost:55721/SaveContact", httpContent);
            var responseString = await response.Content.ReadAsStringAsync();
            if (responseString == "false")
                return false;
            else
            {
                return true;
            }
        }
    }
}