import Parser from 'rss-parser';
import { CompletionCreateParams } from "openai/resources/chat/index";

let parser = new Parser();

export const functions: CompletionCreateParams.Function[] = [
  {
    name: "get_top_stories",
    description:
      "Get the top stories from the Royal Gazette and Bernews RSS feeds. Also returns the URL to each story.",
    parameters: {
      type: "object",
      properties: {
        limit: {
          type: "number",
          description: "The number of stories to return. Defaults to 10.",
        },
      },
      required: [],
    },
    action: async ({ limit = 10 }) => {
      const feed1 = await parser.parseURL('https://navweb.royalgazette.com/feeds');
      const feed2 = await parser.parseURL('http://feeds.feedburner.com/Bernewscom');
      const stories = [...feed1.items, ...feed2.items].slice(0, limit);
      return stories;
    }
  },
  {
    name: "get_story",
    description:
      "Get a story from the RSS feeds. Also returns the URL to the story.",
    parameters: {
      type: "object",
      properties: {
        guid: {
          type: "string",
          description: "The GUID of the story",
        },
      },
      required: ["guid"],
    },
    action: async ({ guid }) => {
      const feed1 = await parser.parseURL('https://navweb.royalgazette.com/feeds');
      const feed2 = await parser.parseURL('http://feeds.feedburner.com/Bernewscom');
      const story = [...feed1.items, ...feed2.items].find(item => item.guid === guid);
      return story;
    }
  },
  // ... rest of the functions
];