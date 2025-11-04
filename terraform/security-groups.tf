# ------------------------
# Security Group for EKS
# ------------------------
resource "aws_security_group" "eks_nodes_sg" {
  name        = "wandercult-eks-nodes-sg"
  description = "Allow access to EKS worker nodes"
  vpc_id      = aws_vpc.main.id

  # Allow inbound traffic for app on NodePort 3000
  ingress {
    description = "Allow app traffic on port 3000"
    from_port   = 4000
    to_port     = 4000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Allow HTTPS (for API server communication)
  ingress {
    description = "Allow HTTPS traffic"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Allow all traffic between nodes in this SG
  ingress {
    description = "Allow inter-node communication"
    from_port   = 0
    to_port     = 65535
    protocol    = "tcp"
    self        = true
  }

  # (Optional) Allow SSH from your IP
  # ingress {
  #   description = "SSH access"
  #   from_port   = 22
  #   to_port     = 22
  #   protocol    = "tcp"
  #   cidr_blocks = ["YOUR_PUBLIC_IP/32"]
  # }

  # Allow all outbound traffic
  egress {
    description = "Allow all outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "wandercult-eks-nodes-sg"
  }
}
