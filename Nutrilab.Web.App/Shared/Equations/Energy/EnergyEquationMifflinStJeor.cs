namespace Nutrilab.Web.App.Shared.Equations.Energy
{
  public class EnergyEquationMifflinStJeor : EnergyEquation<EnergyEquationInput, EnergyEquationOutput>
  {
    public EnergyEquationMifflinStJeor(PatientInfo patientInfo) : base("Mifflin St Jeor", patientInfo, "Energy|General")
    {

    }

    protected override void ComputeValue(ref EnergyEquationOutput output)
    {
      output ??= new();

      var c = Input.Gender == Gender.Male ? 5d : -161d;
      output.ResultKCalDay = 10d * Input.WeightKg + 6.25d * Input.HeightCm - 5 * Input.AgeYr + c;
    }
  }
}

