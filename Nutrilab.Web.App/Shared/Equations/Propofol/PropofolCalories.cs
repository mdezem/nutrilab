using System;
using Nutrilab.Web.App.Shared.Equations;
using Nutrilab.Web.App.Shared.Equations.Propofol;

namespace Nutrilab.Web.App.Shared.Equations.Propofol
{
  public class PropofolCalories : PatientEquation<PropofolCaloriesInput, PropofolCaloriesOutput>
  {
    public PropofolCalories(string name, PatientInfo patientInfo) : base("Propofol", patientInfo, "CTI|Propofol")
    {

    }

    protected override void ComputeValue(ref PropofolCaloriesOutput output)
    {
      output ??= new();

      var dosage_mg_kg_hr = Input.DosageMcgKgMin * 60 * Math.Pow(10, -3);
      output.DosageTotalMg = Math.Round(dosage_mg_kg_hr * Input.WeightKg * Input.DurationHr, 2);
      output.VolumeMl = Math.Round(output.DosageTotalMg * Input.PropofolSolutionConcentration);
      output.Kcal = Math.Round(output.VolumeMl * Input.PropofolSolutionKcalMl);
      output.KcalKg = Math.Round((output.Kcal / Input.WeightKg), 1);
      output.Lipids = output.VolumeMl * (1 - Input.PropofolSolutionConcentration);
    }
  }
}

