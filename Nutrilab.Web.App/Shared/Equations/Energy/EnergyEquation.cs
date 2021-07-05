namespace Nutrilab.Web.App.Shared.Equations.Energy
{
  public abstract class EnergyEquation<TInput, TOutput> : PatientEquation<TInput, TOutput>
    where TInput : EnergyEquationInput
    where TOutput : EnergyEquationOutput
  {
    protected EnergyEquation(string name, PatientInfo patientInfo, string group) : base(name, patientInfo, group)
    {
    }
  }
}

