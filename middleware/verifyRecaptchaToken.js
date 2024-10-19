const {RecaptchaEnterpriseServiceClient} = require('@google-cloud/recaptcha-enterprise');

// Crear una evaluación para analizar el riesgo de una acción de la IU
async function createAssessment({ projectID, recaptchaKey, token, recaptchaAction }) {
    const client = new RecaptchaEnterpriseServiceClient();
    const projectPath = client.projectPath(projectID);

    const request = {
        assessment: {
            event: {
                token: token,
                siteKey: recaptchaKey,
            },
        },
        parent: projectPath,
    };

    const [response] = await client.createAssessment(request);

    if (!response.tokenProperties.valid) {
        console.log(`The CreateAssessment call failed because the token was: ${response.tokenProperties.invalidReason}`);
        return null;
    }

    if (response.tokenProperties.action === recaptchaAction) {
        console.log(`The reCAPTCHA score is: ${response.riskAnalysis.score}`);
        response.riskAnalysis.reasons.forEach((reason) => {
            console.log(reason);
        });
        return response.riskAnalysis.score;
    } else {
        console.log("The action attribute in your reCAPTCHA tag does not match the action you are expecting to score");
        return null;
    }
}

const verifyRecaptchaToken = async (req, res, next) => {
    const score = await createAssessment({
        token: req.body['g-recaptcha-response'],
        recaptchaAction: 'login',
    });

    if (score === null || score < 0.5) {
        return res.status(401).send('reCAPTCHA verification failed: low score');
    }

    req.recaptchaScore = score;
    next();
};

module.exports = verifyRecaptchaToken;
