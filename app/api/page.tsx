import React from "react";
import { Terminal, Code, Copy } from "lucide-react";

export default function APIDocumentation() {
  return (
    <div className="min-h-screen  text-foreground">
      <section className="container mx-auto px-4 py-20 max-w-4xl">
        <div className="mb-16">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent">
            Virtual Mirror API Documentation
          </h1>
          <p className="text-xl text-muted-foreground">
            Integrate AI-powered virtual try-on capabilities into your
            application
          </p>
        </div>

        <div className="space-y-12">
          {/* Authentication Section */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Authentication</h2>
            <div className="bg-card/50 p-6 rounded-lg border border-border">
              <p className="mb-4">
                All API requests require authentication via API key. Include
                your key in the Authorization header:
              </p>
              <code className="block p-4 bg-muted rounded-md mb-4">
                Authorization: Bearer YOUR_API_KEY
              </code>
              <p className="text-sm text-muted-foreground">
                Get your API key from the{" "}
                <a href="/dashboard" className="text-primary">
                  developer dashboard
                </a>
              </p>
            </div>
          </section>

          {/* API Endpoints */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Endpoints</h2>

            {/* Virtual Try-On Endpoint */}
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  POST
                </span>
                <h3 className="text-xl font-semibold">/v1/try-on</h3>
              </div>

              <div className="bg-card/50 p-6 rounded-lg border border-border">
                <p className="mb-4">
                  Process a virtual try-on request with advanced controls
                </p>

                <h4 className="font-medium mb-2">Parameters</h4>
                <div className="space-y-4 mb-6">
                  <div className="flex gap-4 items-start">
                    <div className="w-48">
                      <span className="font-mono text-sm block mb-1">dict</span>
                      <span className="text-xs text-muted-foreground">
                        object (required)
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="mb-2">Masking configuration:</p>
                      <div className="pl-4 space-y-2">
                        <div className="flex gap-2">
                          <span className="font-mono text-sm">background</span>
                          <span className="text-muted-foreground">
                            filepath | null
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <span className="font-mono text-sm">layers</span>
                          <span className="text-muted-foreground">
                            List[filepath]
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <span className="font-mono text-sm">composite</span>
                          <span className="text-muted-foreground">
                            filepath | null
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <ParamRow
                    name="garm_img"
                    type="filepath"
                    required
                    description="Garment image path"
                  />
                  <ParamRow
                    name="garment_des"
                    type="string"
                    required
                    description="Garment description text"
                  />
                  <ParamRow
                    name="is_checked"
                    type="boolean"
                    default="True"
                    description="Enable auto-masking"
                  />
                  <ParamRow
                    name="is_checked_crop"
                    type="boolean"
                    default="False"
                    description="Enable auto-cropping"
                  />
                  <ParamRow
                    name="denoise_steps"
                    type="float"
                    default="30"
                    description="Denoising iterations (1-50)"
                  />
                  <ParamRow
                    name="seed"
                    type="float"
                    default="42"
                    description="Random seed for reproducibility"
                  />
                </div>

                <h4 className="font-medium mb-2">Returns</h4>
                <div className="bg-muted p-4 rounded-md mb-6">
                  <pre className="whitespace-pre-wrap break-words">
                    {`[
  "output_path",    // Rendered try-on result
  "mask_path"       // Generated mask image
]`}
                  </pre>
                </div>

                <h4 className="font-medium mb-2">Example Request</h4>
                <div className="bg-muted p-4 rounded-md mb-6">
                  <pre className="whitespace-pre-wrap break-words">
                    {`curl -X POST https://api.virtualmirror.com/v1/try-on \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "dict": {
      "background": "user_bg.png",
      "layers": ["layer1.png", "layer2.png"],
      "composite": null
    },
    "garm_img": "garment_123.jpg",
    "garment_des": "Red silk evening dress with sequins",
    "is_checked": true,
    "is_checked_crop": false,
    "denoise_steps": 35,
    "seed": 12345
  }'`}
                  </pre>
                </div>

                <h4 className="font-medium mb-2">Response</h4>
                <div className="bg-muted p-4 rounded-md">
                  <pre className="whitespace-pre-wrap break-words">
                    {`{
  "result_id": "tryon_12345",
  "status": "processing",
  "output_url": "https://cdn.virtualmirror.com/results/12345.png",
  "estimated_time": 30
}`}
                  </pre>
                </div>
              </div>
            </div>

            {/* Other Endpoints */}
            <div className="space-y-8">
              <Endpoint
                method="GET"
                path="/v1/results/{result_id}"
                description="Retrieve processing results"
              />
              <Endpoint
                method="GET"
                path="/v1/garments"
                description="List available garments"
              />
              <Endpoint
                method="POST"
                path="/v1/batch-try-on"
                description="Batch processing endpoint"
              />
            </div>
          </section>

          {/* Error Codes */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Error Codes</h2>
            <div className="bg-card/50 p-6 rounded-lg border border-border">
              <div className="grid gap-4">
                <ErrorCode
                  code="400"
                  title="Bad Request"
                  description="Invalid request parameters"
                />
                <ErrorCode
                  code="401"
                  title="Unauthorized"
                  description="Missing or invalid API key"
                />
                <ErrorCode
                  code="429"
                  title="Rate Limit Exceeded"
                  description="Too many requests"
                />
                <ErrorCode
                  code="500"
                  title="Server Error"
                  description="Internal server error"
                />
              </div>
            </div>
          </section>

          {/* Rate Limits */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Rate Limits</h2>
            <div className="bg-card/50 p-6 rounded-lg border border-border">
              <p className="mb-4">
                Free tier: 100 requests/minute
                <br />
                Pro tier: 1,000 requests/minute
                <br />
                Enterprise: Custom limits
              </p>
              <p className="text-sm text-muted-foreground">
                Check your current usage in the{" "}
                <code className="text-primary">X-RateLimit-*</code> headers
              </p>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}

function Endpoint({
  method,
  path,
  description,
}: {
  method: string;
  path: string;
  description: string;
}) {
  return (
    <div className="bg-card/50 p-6 rounded-lg border border-border">
      <div className="flex items-center gap-4 mb-4">
        <span
          className={`px-3 py-1 rounded-full text-sm ${
            method === "POST"
              ? "bg-green-100 text-green-800"
              : "bg-blue-100 text-blue-800"
          }`}
        >
          {method}
        </span>
        <code className="font-mono">{path}</code>
      </div>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

function ErrorCode({
  code,
  title,
  description,
}: {
  code: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-6">
      <div className="w-16">
        <span className="px-3 py-1 bg-destructive/10 text-destructive rounded-full text-sm">
          {code}
        </span>
      </div>
      <div>
        <h4 className="font-medium mb-1">{title}</h4>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

function ParamRow({
  name,
  type,
  required,
  default: defaultValue,
  description,
}: {
  name: string;
  type: string;
  required?: boolean;
  default?: string;
  description: string;
}) {
  return (
    <div className="flex gap-4 items-start">
      <div className="w-48">
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm">{name}</span>
          {required && <span className="text-xs text-destructive">*</span>}
        </div>
        <div className="text-xs text-muted-foreground">
          {type}
          {defaultValue && ` (default: ${defaultValue})`}
        </div>
      </div>
      <p className="flex-1 text-muted-foreground">{description}</p>
    </div>
  );
}
