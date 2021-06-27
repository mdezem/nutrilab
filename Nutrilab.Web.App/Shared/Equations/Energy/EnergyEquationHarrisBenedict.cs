namespace Nutrilab.Web.App.Shared.Services.Nutrition
{
  public class EnergyEquationHarrisBenedict : EnergyEquation
  {
    public EnergyEquationHarrisBenedict(PatientInfo patientInfo) : base("Harris-Benedict", patientInfo, "Energy|General")
    {
    }

    protected override double ComputeValue()
    {
      var adjusted_weight = WeightKg;
      var idealWeight = 0; // TODO this.idealBodyWeight(gender, height_cm);
      if (WeightKg > idealWeight * 1.25)
      {
        adjusted_weight = idealWeight + 0.25 * (WeightKg - idealWeight);
      }

      if (Gender == Gender.Male)
      {
        return 13.75d * HeightCm + 5 * adjusted_weight - 6.8d * AgeYr + 66;
      }
      else
      {
        return 1.8d * HeightCm + 9.6d * adjusted_weight - 4.7d * AgeYr + 655;
      }
    }
  }
}

