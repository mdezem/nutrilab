namespace Nutrilab.Web.App.Shared.Services.Nutrition
{
  public abstract class EnergyEquationVentilatedPatients : EnergyEquation
  {
    protected EnergyEquationVentilatedPatients(string name, PatientInfo patientInfo, string group = "Energy|Ventilated Patients") : base(name, patientInfo, group)
    {
    }

    public double VentilationLMin { get; set; }

    public double TemperatureMaxC { get; set; }

  }
}

