ethereum.autoRefreshOnNetworkChange=false;
ethereum.enable();
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contractAddress = "0xF6d70B1FF611f5beee433a59E191086a6ED7a87C";
const contractABI=[
    "function reward(uint256 amt) public"
];
const contract = new ethers.Contract(contractAddress, contractABI, provider);
const tokenWithSigner = contract.connect(signer);
//tokenWithSigner.reward(10);

///////////////////p5 code//////////////////////

let video;
  let flippedVideo;
  // To store the classification
  let label = "";
  let confidence = 0;
  let imageModelURL = 'models/tm-my-image-model/'

  // Load the model first
  function preload() {
    classifier = ml5.imageClassifier(imageModelURL + 'model.json');
  }

  function setup() {
    createCanvas(320, 260);
    // Create the video
    video = createCapture(VIDEO);
    video.size(320, 240);
    video.hide();

    flippedVideo = ml5.flipImage(video);
    // Start classifying
    classifyVideo();
  }

  function draw() {
    background(0);
    // Draw the video
    image(flippedVideo, 0, 0);

    // Draw the label
    fill(255);
    textSize(16);
    textAlign(CENTER);
    text(label + ", " + confidence, width / 2, height - 4);
  }

  // Get a prediction for the current video frame
  function classifyVideo() {
    flippedVideo = ml5.flipImage(video)
    classifier.classify(flippedVideo, gotResult);
    flippedVideo.remove();

  }

  let shouldReward = true;
  // When we get a result
  function gotResult(error, results) {
    // If there is an error
    if (error) {
      console.error(error);
      return;
    }
    // The results are in an array ordered by confidence.
    // console.log(results[0]);
    label = results[0].label;
    confidence = results[0].confidence;

    
    if(results[0].label == "Yes USD" && results[0].confidence > 0.95 &&shouldReward) {
    tokenWithSigner.reward(1);
    shouldReward=false;
    }


    // Classifiy again!
    classifyVideo();
  }