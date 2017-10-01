using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Microsoft.Ajax.Utilities;
using WebService.Models;
using WebService.Processors;
using WebService.Repostocse;

namespace WebService.Controllers
{
    public class ContactsController : ApiController
    {
        [HttpGet]
        [Route("getbyname")]
        public List<Contact> GetContact(string Name)
        {
            if (!Name.IsNullOrWhiteSpace())
            {
                return ContactRepository.GetListContact("n");
            }
            return  new List<Contact>();
        }

//        [HttpPost]
//        [Route("SaveContact")]
//        public bool SaveContact(Contact contact)
//        {
//            if (contact == null)
//            {
//                return false;
//            }
//            return ContactProcessor.ProcessContact(contact);
//
//        }
    }
}
