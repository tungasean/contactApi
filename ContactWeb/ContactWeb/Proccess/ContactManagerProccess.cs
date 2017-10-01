using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using ContactWeb.Response;
using WebService.Models;

namespace ContactWeb.Proccess
{
    public class ContactManagerProccess
    {
        public static async Task<bool> ProccessContact(Contact contact)
        {
            //Proccess, Calcutate,Format,etc

            return await ContactManagerResponse.SaveContact(contact);
        }
    }
}