// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version: 0.8.0.0
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>

using System;
using System.ComponentModel.DataAnnotations;

namespace Nutrilab.Web.App.Shared.Models
{

  public partial class EnergyEquationReportItem
  {

    [Editable(true)]
    [Required]
    [StringLength(255)]
    public string Name { get; set; }

    [Editable(true)]
    [Required]
    public double ResultKCalDay { get; set; }
  }
}
