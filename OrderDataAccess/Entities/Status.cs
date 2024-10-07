using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace OrderDataAccess.Entities
{ 
        public enum Status
        {
            [Description("Not Delivered")]
            NotDelivered,
            [Description("On Delivery")]
            OnDelivery,
            [Description("Delivery Successful")]
            DeliverySuccessful,
        }
    public static class MyEnumStatus
    {
        public static string ConvertToString(this Status status)
        {
            FieldInfo field = status.GetType().GetField(status.ToString());
            DescriptionAttribute attribute
            = (DescriptionAttribute)field.GetCustomAttribute(typeof(DescriptionAttribute));
            return attribute == null ? status.ToString() : attribute.Description;


            //DescriptionAttribute[] attributes = status
            //    .GetType().GetField(status.ToString())
            //    .GetCustomAttribute(typeof(DescriptionAttribute), false) as DescriptionAttribute[];
            //return attributes.Length>0 ? attributes[0].Description: string.Empty;

        }
    }
}
