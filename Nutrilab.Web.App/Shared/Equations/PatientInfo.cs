using System;
using System.ComponentModel.DataAnnotations;
using System.Security.Cryptography;

namespace Nutrilab.Web.App.Shared.Equations
{
  public class PatientInfo
  {
    public PatientInfo()
    {
      Id = Guid.NewGuid();
    }

    public PatientInfo(Guid id)
    {
      Id = id;
    }

    public Guid Id { get; }

    public string Tag { get; set; }

    [Required]
    public Gender Gender { get; set; }

    [Required]
    public int AgeYr { get; set; }

    [Required]
    public double HeightCm { get; set; }

    [Required]
    public double WeightKg { get; set; }
  }
}

