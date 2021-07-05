namespace Nutrilab.Web.App.Shared.Equations.Energy
{
  public class EnergyEquationHarrisBenedict : EnergyEquation<EnergyEquationInput, EnergyEquationOutput>
  {
    public EnergyEquationHarrisBenedict(PatientInfo patientInfo) : base("Harris-Benedict", patientInfo, "Energy|General")
    {
    }

    protected override void ComputeValue(ref EnergyEquationOutput output)
    {
      output ??= new();

      var adjusted_weight = Input.WeightKg;
      var idealWeight = 0; // TODO this.idealBodyWeight(gender, height_cm);
      if (Input.WeightKg > idealWeight * 1.25)
      {
        adjusted_weight = idealWeight + 0.25 * (Input.WeightKg - idealWeight);
      }

      if (Input.Gender == Gender.Male)
      {
        output.ResultKCalDay = 13.75d * Input.HeightCm + 5 * adjusted_weight - 6.8d * Input.AgeYr + 66;
      }
      else
      {
        output.ResultKCalDay = 1.8d * Input.HeightCm + 9.6d * adjusted_weight - 4.7d * Input.AgeYr + 655;
      }
    }
  }
}

