#!/bin/bash

# Script untuk build dan push Docker image multi-architecture ke GHCR (GitHub Container Registry)
# Support .env auto token injection
# Usage: ./autobuild_ghcr.sh

set -e

# Colors untuk output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored messages
print_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
print_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
print_warning() { echo -e "${YELLOW}[WARNING]${NC} $1"; }
print_error() { echo -e "${RED}[ERROR]${NC} $1"; }

# Load .env if exists
if [ -f .env ]; then
    print_info "Loading environment variables from .env..."
    export $(grep -v '^#' .env | xargs)
else
    print_warning ".env file not found - skipping"
fi

# Validate required variables
if [ -z "$GITHUB_PAT_TOKEN" ]; then
    print_error "GITHUB_PAT_TOKEN not found in .env!"
    echo -e "${YELLOW}Add this to your .env:${NC}"
    echo "GITHUB_PAT_TOKEN=ghp_xxxxxx"
    exit 1
fi

# Defaults if not in .env
GHCR_USERNAME="${GHCR_USERNAME:-farismnrr}"
GHCR_NAMESPACE="${GHCR_NAMESPACE:-i-otnet}"
IMAGE_NAME="iotnet"
PLATFORMS="linux/amd64,linux/arm64"
REGISTRY="ghcr.io"
FULL_REGISTRY_PATH="${REGISTRY}/${GHCR_NAMESPACE}/${IMAGE_NAME}"

print_info "Using GHCR namespace: ${GHCR_NAMESPACE}"
print_info "Using GitHub username: ${GHCR_USERNAME}"
print_info "Registry path: ${FULL_REGISTRY_PATH}"

# Authenticate GHCR
print_info "Authenticating to GHCR..."
echo "$GITHUB_PAT_TOKEN" | docker login ghcr.io -u $GHCR_USERNAME --password-stdin

# Prompt user for tag name
echo ""
print_info "GHCR Build & Push Tool"
echo "════════════════════════════════════════"
echo ""
echo -e "${YELLOW}Enter tag name for GHCR image:${NC}"
echo "Examples: dev, latest, v1.0.0, staging"
echo -n "Tag: "
read TAG_NAME
echo ""

if [ -z "$TAG_NAME" ]; then
    print_error "Tag name cannot be empty!"
    exit 1
fi

FULL_IMAGE_NAME="${FULL_REGISTRY_PATH}:${TAG_NAME}"

print_info "Starting multi-architecture build process..."
print_info "Image: ${FULL_IMAGE_NAME}"
print_info "Platforms: ${PLATFORMS}"

# Check Docker
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed!"
    exit 1
fi

# Check buildx
if ! docker buildx version &> /dev/null; then
    print_error "Docker buildx is not available!"
    print_info "Please install or enable Docker buildx"
    exit 1
fi

# Create or use existing buildx builder
BUILDER_NAME="iotnet-builder"
if ! docker buildx inspect ${BUILDER_NAME} &> /dev/null; then
    print_info "Creating new buildx builder: ${BUILDER_NAME}"
    docker buildx create --name ${BUILDER_NAME} --use --bootstrap
else
    print_info "Using existing buildx builder: ${BUILDER_NAME}"
    docker buildx use ${BUILDER_NAME}
fi

# Build & Push
print_info "Building & pushing image to GHCR..."
docker buildx build \
    --platform ${PLATFORMS} \
    --tag ${FULL_IMAGE_NAME} \
    --push \
    --progress=tty \
    .

print_success "Image pushed successfully to: ${FULL_IMAGE_NAME}"
echo ""
print_info "To pull this image:"
echo "  docker pull ${FULL_IMAGE_NAME}"
