/* eslint-disable unicorn/prefer-module */
/* eslint-disable @typescript-eslint/no-var-requires */

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
};

const withPlugins = require('next-compose-plugins');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withPlugins([withBundleAnalyzer, nextConfig]);
