using System.ComponentModel.DataAnnotations;

namespace ActivitiesAPI.DataTransferObjects
{
    public class RegisterDto
    {
        [Required]
        public string DisplayName { get; set; }

        [Required]
        public string UserName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}?")]
        public string Password { get; set; }
    }
}