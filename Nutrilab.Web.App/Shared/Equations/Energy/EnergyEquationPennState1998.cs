namespace Nutrilab.Web.App.Shared.Services.Nutrition
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

    protected override double ComputeValue()
    {
      if (HarrisBenedict.Update()) {
        return 1.1 * HarrisBenedict.Result + 140 * TemperatureMaxC + 32 * VentilationLMin - 5340;
      }
      // todo add errors
      return 0;
    }
  }
}

