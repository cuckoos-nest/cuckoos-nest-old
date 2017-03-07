using CukoosApi.Data.Enums;
using CukoosApi.Data.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CukoosApi.Data.Entities
{
	[Table("Notifications")]
	public class NotificationEntity : IEntity
	{
		[Key]
		[Column("id")]
		[Required]
		public int Id { get; set; }

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
		public virtual UserEntity ReceivingUser { get; set; }

		[Column("sentByUser")]
		[Required]
		public int SentByUserId { get; set; }

		[ForeignKey("SentByUserId")]
		public virtual UserEntity SentByUser { get; set; }

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
