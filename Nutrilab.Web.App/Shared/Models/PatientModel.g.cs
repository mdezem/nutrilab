// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version: 0.8.0.0
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Nutrilab.Web.App.Shared.Models
{

  public partial class PatientModel
  {

    public Guid Id { get; set; }

    [Editable(true)]
    [Required]
    [StringLength(32, MinimumLength = 5)]
    public string Tag { get; set; }

    public Gender Gender { get; set; }

    [Editable(true)]
    [Required]
    [Range(1, 12)]
    public int MonthOfBirth { get; set; }

    [Editable(true)]
    [Required]
    [Range(1900, 2030)]
    public int YearOfBirth { get; set; }
  }
}
