using System;

namespace Nutrilab.Web.App.Shared.Services.Nutrition
{
  public class Propofol
  {
    public const double PROPOFOL_SOLUTION_CONCENTRATION = 0.1; // (10mg/ml in 10% lipid emulsion)
    public const double PROPOFOL_SOLUTION_KCAL_ML = 1.1;

    public void CalcPropofol(
  double dosage_mcg_kg_min,
  double weight_kg,
  double duration_hr,
  double propofolSolutionConcentration = PROPOFOL_SOLUTION_CONCENTRATION,
  double propofolSolutionKcalMl = PROPOFOL_SOLUTION_KCAL_ML
)
    {
      var dosage_mg_kg_hr = dosage_mcg_kg_min * 60 * Math.Pow(10, -3);
      var dosageTotal_mg = Math.Round(dosage_mg_kg_hr * weight_kg * duration_hr, 2);
      var volume_ml = Math.Round(dosageTotal_mg * propofolSolutionConcentration);
      var kcal = Math.Round(volume_ml * propofolSolutionKcalMl);
      var kcal_kg = Math.Round((kcal / weight_kg), 1);
      var lipids_g = volume_ml - volume_ml * propofolSolutionConcentration;

      return {
        dosage_mcg_kg_min,
      weight_kg,
      duration_hr,
      solutionConcentration: propofolSolutionConcentration,
      solution_kcal_ml: propofolSolutionKcalMl,
      dosageTotal_mg,
      volume_ml,
      kcal,
      kcal_kg,
      lipids_g
        };
    }

  }
}

