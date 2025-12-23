import { InferenceClient } from "@huggingface/inference";

const HF_API_KEY = process.env.HF_API_KEY;
if (!HF_API_KEY) throw new Error("HF_API_KEY is not defined");
const hf = new InferenceClient(HF_API_KEY);

export default hf;