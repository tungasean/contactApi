using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebService.Models;
using WebService.Repostocse;

namespace WebService.Processors
{
    public class ContactProcessor
    {
        public static bool ProcessContact(Contact contact)
        {
            //Processing

            return ContactRepository.AddContactToDB(contact);
        }
    }
} 