using Nutrilab.Web.App.Shared.Equations;
using System.Collections.Generic;

namespace Nutrilab.Web.App.Shared.Services.Nutrition
{

  public abstract class EnergyEquation : PatientEquation
  {
    public Gender Gender { get => PatientInfo.Gender; }

    public double WeightKg { get => PatientInfo.WeightKg; }

    public double HeightCm { get => PatientInfo.HeightCm; }

    public int AgeYr { get => PatientInfo.AgeYr; }

    protected EnergyEquation(string name, PatientInfo patientInfo, string group) : base(name, patientInfo, group)
    {
    }
  }
}

