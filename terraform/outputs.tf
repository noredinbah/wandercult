output "cluster_name" {
  value = aws_eks_cluster.wandercult.name
}

output "cluster_endpoint" {
  value = aws_eks_cluster.wandercult.endpoint
}

output "cluster_ca_certificate" {
  value = aws_eks_cluster.wandercult.certificate_authority[0].data
}

output "node_group_name" {
  value = aws_eks_node_group.wandercult_nodes.node_group_name
}
