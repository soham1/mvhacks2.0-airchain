pragma solidity ^0.5.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Adoption.sol";

contract TestAdoption {
 // The address of the adoption contract to be tested
 Adoption adoption = Adoption(DeployedAddresses.Adoption());

// function testUserCanAdoptPet() public {
//     uint returnedId = adoption.adopt(expectedPetId);

//     Assert.equal(returnedId, expectedPetId, "Adoption of the expected pet should match what is returned.");
// }

// function testGetAdopterAddressByPetId() public {
//   address adopter = adoption.adopters(expectedPetId);

//   Assert.equal(adopter, expectedAdopter, "Owner of the expected pet should be this contract");
// }

// function testGetAdopterAddressByPetIdInArray() public {
//   address[16] memory adopters = adoption.getAdopters();

//   Assert.equal(adopters[expectedPetId], expectedAdopter, "Owner of the expected pet should be this contract");
// }

//  uint expectedPetId = 8;

//  address expectedAdopter = address(this);

 // =========================================================================


// Testing Add Aircraft Feature

function testAddAircraftFeature() public {
  uint expectedFeatureId = 1;
  uint expectedModelId = 1;
  uint expectedLength = adoption.getAircraftFeatureCount() + 1;

  uint featureId;
  uint modelId;

  (featureId, modelId) = adoption.addAircraftFeature(expectedFeatureId, expectedModelId, "Test Description");

  uint featureIdAtIndex = adoption.getAircraftFeatureIdByIndex(0);
  
  uint modelIdAtIndex;
  string memory featureDescriptionAtIndex;

  (modelIdAtIndex, featureDescriptionAtIndex) = adoption.getAircraftFeatureById(featureIdAtIndex);

  Assert.equal(adoption.getAircraftFeatureCount(), expectedLength, "Length should be 1 more now");
  Assert.equal(featureIdAtIndex, expectedFeatureId, "Feature Id of the first item must be correct");
  Assert.equal(modelIdAtIndex, expectedModelId, "Model Id of the first item must be correct");
  Assert.equal(featureId, expectedFeatureId, "Feature Id must be same");
  Assert.equal(modelId, expectedModelId, "Model Id must be same");
}

// Testing Add Training Program 

function testAddTrainingProgram() public {
  uint expectedProgramId = 1;
  uint expectedFeatureId = 1;

  uint programId;
  uint featureId;

  (programId, featureId) = adoption.addTrainingProgram(expectedProgramId, expectedFeatureId, "Test Description");

  Assert.equal(programId, expectedProgramId, "Program Id must be the same");
  Assert.equal(featureId, expectedFeatureId, "Feature Id must be the same");
}

// Testing Approving Certification

function testApproveCertification() public {
  uint expectedCertificationId = 1;
  uint expectedPilotId = 1;
  uint expectedFeatureId = 1;

  uint certificationId;
  uint pilotId;

  (certificationId, pilotId) = adoption.approveCertification(expectedCertificationId, expectedPilotId, expectedFeatureId, "3/30/2019");

  Assert.equal(certificationId, expectedCertificationId, "Certification Id must be the same");
  Assert.equal(adoption.checkCertification(expectedPilotId, expectedFeatureId), true, "Certification Check Should Pass");
  Assert.equal(pilotId, expectedPilotId, "Pilot Id must be the same");
}

}

