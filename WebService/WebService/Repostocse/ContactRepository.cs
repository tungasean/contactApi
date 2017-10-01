using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WebService.Models;

namespace WebService.Repostocse
{
    public class ContactRepository
    {
        public static bool AddContactToDB(Contact contact)
        {
            var connectionString =
                @"Data Source=DESKTOP-AKLGAKR;Initial Catalog=ContactManager;Integrated Security=True";

            var query = "Insert into ContactList (Name, PhoneNumber, Note) Values ('@Name','@PhoneNum','@Note')";
            query = query.Replace("@Name", contact.Name).Replace("@PhoneNum", contact.PhoneNumber)
                .Replace("@Note", contact.Note);

            SqlConnection connection = new SqlConnection(connectionString);

            try
            {
                connection.Open();
                SqlCommand command = new SqlCommand(query, connection);
                command.ExecuteNonQuery();
                command.Dispose();
                connection.Close();
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return false;
            }
        }


        public static List<Contact> GetListContact(string name)
        {
            var connectionString =
                @"Data Source=DESKTOP-AKLGAKR;Initial Catalog=ContactManager;Integrated Security=True";

            var query = "Select * from ContactList where Name LIKE '%@name%'";
            query = query.Replace("@name", name);

            SqlConnection connection = new SqlConnection(connectionString);
            try
            {
                connection.Open();
                SqlCommand command = new SqlCommand(query,connection);
                command.ExecuteNonQuery();
                command.Dispose();
                connection.Close();
                return new List<Contact>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
    }
}