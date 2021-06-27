namespace Nutrilab.Web.App.Shared.Services.Nutrition
{
  public class EnergyEquationFaisyFagon : EnergyEquationVentilatedPatients
  {
    public EnergyEquationFaisyFagon(PatientInfo patientInfo) : base("Faily Fagon", patientInfo)
    {
    }

    protected override double ComputeValue()
    {
      return (
        8 * WeightKg +
        14 * HeightCm +
        32 * VentilationLMin +
        94 * TemperatureMaxC -
        4834
      );
    }
  }
}

