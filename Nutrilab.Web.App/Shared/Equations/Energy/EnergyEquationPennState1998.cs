namespace Nutrilab.Web.App.Shared.Equations.Energy
{
  public class EnergyEquationPennState1998 : EnergyEquationVentilatedPatients
  {
    public EnergyEquationPennState1998(PatientInfo patientInfo) : base("Penn State 1998", patientInfo)
    {
      HarrisBenedict = new EnergyEquationHarrisBenedict(PatientInfo);
    }

    public EnergyEquationHarrisBenedict HarrisBenedict { get; }

    public override bool Accept()
    {
      return base.Accept() && HarrisBenedict.Accept();
    }

    public override bool Validate()
    {
      return base.Validate() && HarrisBenedict.Validate();
    }

    protected override void ComputeValue(ref EnergyEquationOutput output)
    {
      output ??= new();

      if (HarrisBenedict.Update())
      {
        output.ResultKCalDay =
          1.1 * HarrisBenedict.Result.ResultKCalDay
          + 140 * Input.TemperatureMaxC
          + 32 * Input.VentilationLMin
          - 5340;
      }
      // todo add errors
    }
  }
}

