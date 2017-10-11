using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Security.Cryptography;
using System.Text;

namespace EmpService.Controllers.Utils
{
    public class Compernon
    {
        #region ham ma hoa md5
        public static string EnCodeToMd5 (string input)
        {
            string output = input;
            MD5 mh = MD5.Create();
            //chuyen kieu chuoi ve kieu byte
            byte[] inputBytes = System.Text.Encoding.ASCII.GetBytes(input);
            //mã hóa chuỗi đã chuyển
            byte[] hash = mh.ComputeHash(inputBytes);
            //tạo đối tượng StringBuilder (làm việc với kiểu dữ liệu lớn)
            StringBuilder sb = new StringBuilder();

            for (int i = 0; i < hash.Length; i++)
            {
                //nếu bạn muốn các chữ cái in thường thay vì in hoa thì bạn thay chữ "X" in hoa trong "X2" thành "x"
                sb.Append(hash[i].ToString("X2"));
            }
            output = sb.ToString();

            return output;
        }
        #endregion

    }
}