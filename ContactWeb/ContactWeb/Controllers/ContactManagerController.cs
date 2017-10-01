using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using ContactWeb.Proccess;
using WebService.Models;

namespace ContactWeb.Controllers
{
    public class ContactManagerController : Controller
    {
        // GET: ContactManager
        public async Task<ActionResult> SaveContact()
        {
            var contact = new Contact();
            contact.Name = "Tony";
            contact.PhoneNumber = "21513524";
            contact.Note = "CEO";
            var success = await ContactManagerProccess.ProccessContact(contact);

            if (success)
            {
                ViewBag.Message = "Contact has been saved";
            }
            else
            {
                ViewBag.Message = " save lose";
            }
            return View();
        }
    }
}