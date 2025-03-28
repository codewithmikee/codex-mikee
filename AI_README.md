# AI Integration Guide

This guide explains how to set up and configure AI capabilities in the monorepo project.

## Prerequisites

- An OpenAI API key (https://platform.openai.com/api-keys)

## Setting Up Your API Key

The AI features in this project require an OpenAI API key to function properly. Follow these steps to set up your API key:

### Option 1: Using Environment Variables (Development)

1. Create a `.env` file in the root of the `servers/shell-ai` directory:

```bash
cd servers/shell-ai
touch .env
```

2. Add your OpenAI API key to the `.env` file:

```
OPENAI_API_KEY=your_api_key_here
```

3. Restart the shell-ai service for the changes to take effect.

### Option 2: Using Replit Secrets (Recommended for Deployment)

1. In your Replit project, go to the "Secrets" tab in the Tools panel.
2. Create a new secret with the key `OPENAI_API_KEY` and your API key as the value.
3. Restart the application for the changes to take effect.

## API Key Security

- **NEVER** commit your API key to version control
- Always use environment variables or secrets for storing sensitive credentials
- Restrict your API key's permissions in the OpenAI dashboard to minimize potential risks

## Configuring AI Models

By default, the application uses the following OpenAI models:

- **Text Generation**: GPT-4o (for shell script generation)
- **Code Analysis**: GPT-4o (for script validation)

### Customizing Model Selection

You can modify the model selection in `servers/shell-ai/src/services/script-generator.ts`:

```typescript
// Example configuration (default)
const model = "gpt-4o"; // the newest OpenAI model is "gpt-4o" which was released May 13, 2024

// Alternative configuration (for cost optimization)
// const model = "gpt-3.5-turbo"; // Less capable but more cost-effective
```

## API Usage and Costs

- Be aware that using the OpenAI API incurs costs based on your usage
- The application is configured to use tokens efficiently
- Monitor your usage in the OpenAI dashboard: https://platform.openai.com/usage

## Advanced Configuration

### Temperature Setting

The "temperature" parameter controls the randomness of the AI outputs. Lower values make the output more deterministic, while higher values introduce more creativity.

The default temperature is set to 0.3 for predictable shell script generation. You can adjust this in `servers/shell-ai/src/services/script-generator.ts`:

```typescript
// Default (more deterministic)
const temperature = 0.3;

// More creative (if you want more varied scripts)
// const temperature = 0.7;
```

### Request Timeout

You can adjust the timeout for API requests to OpenAI in `servers/shell-ai/src/services/script-generator.ts`:

```typescript
// Default timeout (20 seconds)
const requestTimeout = 20000;

// Extended timeout for complex scripts
// const requestTimeout = 40000;
```

## Troubleshooting

### Common Issues

1. **"OpenAI API key not configured"**: Ensure your API key is properly set in the environment variables or Replit secrets.

2. **API Rate Limiting**: If you hit OpenAI's rate limits, the application will return an error. Consider:
   - Using a paid OpenAI account with higher rate limits
   - Implementing request throttling
   - Caching common responses

3. **Model Not Available**: If the specified model is not available for your account, the application will fall back to an available model.

### API Status

You can check the operational status of OpenAI's API at: https://status.openai.com/

## Feature Extension

If you wish to extend the AI capabilities of the application:

1. Add new service functions in `servers/shell-ai/src/services/`
2. Create corresponding API endpoints in `servers/shell-ai/src/routes/`
3. Update the frontend to utilize the new capabilities