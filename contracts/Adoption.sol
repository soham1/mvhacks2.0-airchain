pragma solidity ^0.5.0;

contract Adoption {

    // address[16] public adopters;

    // function adopt(uint petId) public returns (uint) {
    //     require(petId >= 0 && petId <= 15);

    //     adopters[petId] = msg.sender;

    //     return petId;
    // }

    // function getAdopters() public view returns (address[16] memory) {
    //     return adopters;
    // }

    // ===============================================================

    // Aircraft

    struct AircraftFeature {
        uint modelId;
        string featureDescription;
    }

    mapping (uint => AircraftFeature) aircraftFeatures;
    uint[] public aircraftFeatureList;

    function addAircraftFeature(uint _featureId, uint _modelId, string memory _featureDescription) public returns (uint, uint) {
        AircraftFeature storage aircraftFeature = aircraftFeatures[_featureId];

        aircraftFeatureList.push(_featureId);

        aircraftFeature.modelId = _modelId;
        aircraftFeature.featureDescription = _featureDescription;

        return (_featureId, aircraftFeatures[_featureId].modelId);
    }

    function getAircraftFeatureCount() public view returns (uint) {
        return aircraftFeatureList.length;
    }

    function getAircraftFeatureIdByIndex(uint _index) public view returns (uint) {
        return aircraftFeatureList[_index];
    }

    function getAircraftFeatureById(uint _featureId) public view returns (uint, string memory) {
        return (aircraftFeatures[_featureId].modelId, aircraftFeatures[_featureId].featureDescription);
    }

    // Training 

    struct TrainingProgram {
        uint featureId;
        string featureDescription;
    }

    mapping (uint => TrainingProgram) trainingPrograms;

    function addTrainingProgram(uint _programId, uint _featureId, string memory _featureDescription) public returns (uint, uint) {
        TrainingProgram storage trainingProgram = trainingPrograms[_programId];

        trainingProgram.featureId = _featureId;
        trainingProgram.featureDescription = _featureDescription;

        return (_programId, trainingPrograms[_programId].featureId);
    } 

    // Approve Certification

    struct Certification {
        uint pilotId;
        uint featureId;
        string date;
    }

    mapping (uint => Certification) certifications;
    uint[] public certificationIdList;

    function approveCertification(uint _certificationId, uint _pilotId, uint _featureId, string memory _date) public returns (uint, uint) {
        Certification storage certification = certifications[_certificationId];

        certificationIdList.push(_certificationId);

        certification.pilotId = _pilotId;
        certification.featureId = _featureId;
        certification.date = _date;

        return (_certificationId, certifications[_certificationId].pilotId);
    }

    // Check Certification

    function checkCertification(uint _pilotId, uint _featureId) public view returns (bool) {
        bool pilotFound = false;

        for (uint i = 0; i < certificationIdList.length; i++) {
            Certification storage certification = certifications[certificationIdList[i]];
            if (certification.pilotId == _pilotId && certification.featureId == _featureId) {
                pilotFound = true;
                break;
            }
        }

        return pilotFound;
    }

}