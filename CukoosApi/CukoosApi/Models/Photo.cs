//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace CukoosApi.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Photo
    {
        public int id { get; set; }
        public string title { get; set; }
        public byte[] image { get; set; }
        public int category { get; set; }
    
        public virtual Category Category1 { get; set; }
    }
}
