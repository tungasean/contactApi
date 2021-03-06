﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using EmpService.Models;

namespace EmpService.Controllers
{
    public class AccountsController : ApiController
    {
        private QUANLYKYTUCEntities db = new QUANLYKYTUCEntities();

        // GET: api/Accounts
        public IQueryable<ACCOUNT> GetACCOUNTs()
        {
            return db.ACCOUNTs;
        }

        // GET: api/Accounts/5
        [ResponseType(typeof(ACCOUNT))]
        public IHttpActionResult GetACCOUNT(string id)
        {
            ACCOUNT aCCOUNT = db.ACCOUNTs.Find(id);
            if (aCCOUNT == null)
            {
                return NotFound();
            }

            return Ok(aCCOUNT);
        }

        // PUT: api/Accounts/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutACCOUNT(string username, string pass)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var session = HttpContext.Current.Session;

                SqlConnection con = new SqlConnection(@"Data Source =TungNguyen;Initial Catalog=QUANLYKYTUC;
                Integrated Security=True;MultipleActiveResultSets=True;Application Name=EntityFramework");
                con.Open();
                string sql = "select COUNT(*) from ACCOUNT where ACCOUNTNAME = '" + username + "' AND PASS = '" + pass + "'";
                SqlCommand com = new SqlCommand(sql, con);
                string output = com.ExecuteScalar().ToString();

                if (output == "1")
                {
                    //session["user"] = aCCOUNT.ACCOUNTNAME;
                    return Ok(username);
                }
                
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }

            return Ok(username);
        }

        // PUT: api/Accounts/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutACCOUNT(string id, ACCOUNT aCCOUNT)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                if (id != aCCOUNT.ACCOUNTID)
                {
                    return BadRequest();
                }

                db.Entry(aCCOUNT).State = EntityState.Modified;

                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ACCOUNTExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Accounts
        [ResponseType(typeof(ACCOUNT))]
        public IHttpActionResult PostACCOUNT(ACCOUNT aCCOUNT)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ACCOUNTs.Add(aCCOUNT);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (ACCOUNTExists(aCCOUNT.ACCOUNTID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = aCCOUNT.ACCOUNTID }, aCCOUNT);
        }

        // DELETE: api/Accounts/5
        [ResponseType(typeof(ACCOUNT))]
        public IHttpActionResult DeleteACCOUNT(string id)
        {
            ACCOUNT aCCOUNT = db.ACCOUNTs.Find(id);
            if (aCCOUNT == null)
            {
                return NotFound();
            }

            db.ACCOUNTs.Remove(aCCOUNT);
            db.SaveChanges();

            return Ok(aCCOUNT);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ACCOUNTExists(string id)
        {
            return db.ACCOUNTs.Count(e => e.ACCOUNTID == id) > 0;
        }


    }
}