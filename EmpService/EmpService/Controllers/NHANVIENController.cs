using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using EmpService.Controllers.Utils;
using EmpService.Models;

namespace EmpService.Controllers
{
    public class NhanvienController : ApiController
    {
        private QUANLYKYTUCEntities db = new QUANLYKYTUCEntities();

        #region Lay All Nhan Vien
        // GET: api/C_NHANVIEN
        public IQueryable<C_NHANVIEN> GetC_NHANVIEN()
        {
            return db.C_NHANVIEN;
        }
        #endregion

        #region Lay Danh Sach Nhan Vien THeo ID
        // GET: api/C_NHANVIEN/5
        [ResponseType(typeof(C_NHANVIEN))]
        public IHttpActionResult GetC_NHANVIEN(string id)
        {
            C_NHANVIEN c_NHANVIEN = db.C_NHANVIEN.Find(id);
            if (c_NHANVIEN == null)
            {
                return NotFound();
            }

            return Ok(c_NHANVIEN);
        }
        #endregion

        #region Sua Nhan Vien
        // PUT: api/C_NHANVIEN/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutC_NHANVIEN(string id, C_NHANVIEN c_NHANVIEN)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != c_NHANVIEN.MANV)
            {
                return BadRequest();
            }

            db.Entry(c_NHANVIEN).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!C_NHANVIENExists(id))
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
        #endregion

        #region Them Moi Nhan Vien
        // POST: api/C_NHANVIEN
        [ResponseType(typeof(C_NHANVIEN))]
        public IHttpActionResult PostC_NHANVIEN(C_NHANVIEN c_NHANVIEN)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            c_NHANVIEN.MANV = new Random().Next().ToString();

            db.C_NHANVIEN.Add(c_NHANVIEN);
            //            c_NHANVIEN.HOTEN = Compernon.EnCodeToMd5(c_NHANVIEN.HOTEN);
            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (C_NHANVIENExists(c_NHANVIEN.MANV))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = c_NHANVIEN.MANV }, c_NHANVIEN);
        }
        #endregion

        #region Xoa Nhan Vien
        // DELETE: api/C_NHANVIEN/5
        [ResponseType(typeof(C_NHANVIEN))]
        public IHttpActionResult DeleteC_NHANVIEN(string id)
        {
            C_NHANVIEN c_NHANVIEN = db.C_NHANVIEN.Find(id);
            if (c_NHANVIEN == null)
            {
                return NotFound();
            }

            db.C_NHANVIEN.Remove(c_NHANVIEN);
            db.SaveChanges();

            return Ok(c_NHANVIEN);
        }
        #endregion


        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool C_NHANVIENExists(string id)
        {
            return db.C_NHANVIEN.Count(e => e.MANV == id) > 0;
        }
    }
}