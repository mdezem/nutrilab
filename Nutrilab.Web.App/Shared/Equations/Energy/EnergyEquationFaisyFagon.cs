namespace Nutrilab.Web.App.Shared.Equations.Energy
{
  public class EnergyEquationFaisyFagon : EnergyEquationVentilatedPatients
  {
    public EnergyEquationFaisyFagon(PatientInfo patientInfo) : base("Faily Fagon", patientInfo)
    {
    }

    protected override void ComputeValue(ref EnergyEquationOutput output)
    {
      output ??= new();

      output.ResultKCalDay = (
        8 * Input.WeightKg +
        14 * Input.HeightCm +
        32 * Input.VentilationLMin +
        94 * Input.TemperatureMaxC -
        4834
      );
    }
  }
}

