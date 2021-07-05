namespace Nutrilab.Web.App.Shared.Equations.Energy
{
  public class EnergyEquationVentilatedPatientsInput : EnergyEquationInput
  {
    public EnergyEquationVentilatedPatientsInput(PatientInfo patientInfo) : base(patientInfo)
    {
    }

    public double VentilationLMin { get; set; }

    public double TemperatureMaxC { get; set; }
  }
}

