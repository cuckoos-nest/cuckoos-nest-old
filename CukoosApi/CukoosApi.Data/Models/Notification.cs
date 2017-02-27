﻿using CukoosApi.Data.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CukoosApi.Data.Models
{
	[Table("Notifications")]
	public class Notification
	{
		[Key]
		[Column("id")]
		[Required]
		public long Id { get; set; }

		[Column("type")]
		[Required]
		public Int16 DatabaseType { get; set; }

        [NotMapped]
        public NotificationType Type
        {
          get
          {
            return (NotificationType)DatabaseType;
          }
          set
          {
            DatabaseType = (Int16)value;
          }
        }


        [Column("receivingUser")]
		[Required]
		public int ReceivingUserId { get; set; }

		[ForeignKey("ReceivingUserId")]
		public User ReceivingUser { get; set; }

		[Column("sentByUser")]
		[Required]
		public int SentByUserId { get; set; }

		//[ForeignKey("SentByUserId")]
		//public User SentByUser { get; set; }

		[Column("creation")]
		[Required]
		public DateTime CreationDate { get; set; }

        [Column("isRead")]
        [Required]
        public bool IsRead { get; set; }
	}
}
