namespace Nutrilab.Web.App.Shared.Equations.Energy
{
  public abstract class EnergyEquationVentilatedPatients : EnergyEquation<EnergyEquationVentilatedPatientsInput, EnergyEquationOutput>
  {
    protected EnergyEquationVentilatedPatients(string name, PatientInfo patientInfo, string group = "Energy|Ventilated Patients") : base(name, patientInfo, group)
    {
    }

    protected abstract override void ComputeValue(ref EnergyEquationOutput output);

  }
}

